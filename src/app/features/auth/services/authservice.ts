import { Injectable } from '@angular/core';
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  OAuthResponse,
  PostgrestError,
  Session,
  User,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabaseClient';
import { type IProfile } from '../interfaces/iprofile';
import { ITeacher } from '../interfaces/iteacher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _supabase = supabase;
  private _session: Session | null = null;
  private _user: User | null = null;

  /**
   * Load and cache the current auth state
   */
  async loadAuthState(): Promise<void> {
    const { data } = await this._supabase.auth.getSession();
    this._session = data.session ?? null;

    if (this._session) {
      const { data: userData } = await this._supabase.auth.getUser();
      this._user = userData.user ?? null;
    } else {
      this._user = null;
    }
  }

  /**
   * Get cached session synchronously
   */
  get sessionSync(): Session | null {
    return this._session;
  }

  /**
   * Get cached user synchronously
   */
  get userSync(): User | null {
    return this._user;
  }

  /**
   * Get user role from cached user metadata
   */
  get role(): string | undefined {
    return this._user?.user_metadata?.['role'];
  }

  /**
   * Check if user is authenticated (has valid session)
   */
  get isAuthenticated(): boolean {
    return this._session !== null && this._user !== null;
  }

  /**
   * Sign up with email and password and create a profile
   * @param email User email
   * @param password User password
   * @param full_name User full name
   * @param data Optional user metadata
   */
  private profileSignUp = async (
    email: string,
    password: string,
    full_name: string,
    avatar_url?: string,
    role?: string,
    data?: object,
  ): Promise<{
    data: { user: AuthResponse['data']; profile: IProfile } | null;
    error: AuthError | PostgrestError | null;
  }> => {
    // 1- Create user in auth table
    const { data: authData, error: userError } = await this._supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    });

    if (userError) {
      return { data: null, error: userError };
    }

    // 2- Create user in profiles table
    const { data: profile, error: profileError } = await this._supabase
      .from('profiles')
      .insert({
        user_id: authData?.user?.id,
        email,
        full_name,
        avatar_url,
        role,
        ...data,
      })
      .select()
      .single();

    if (profileError) {
      return { data: null, error: profileError };
    }

    return { data: { user: authData, profile }, error: null };
  };

  public teacherSignUp = async (
    email: string,
    password: string,
    full_name: string,
    avatar_url?: string,
    data?: object,
  ): Promise<{
    data: { profile: IProfile; teacher: ITeacher } | null;
    error: AuthError | PostgrestError | null;
  }> => {
    // 1- Create profile (includes auth sign up)
    const { data: profileData, error: profileError } = await this.profileSignUp(
      email,
      password,
      full_name,
      avatar_url,
      'teacher',
      data,
    );

    if (profileError) {
      return { data: null, error: profileError };
    }

    // 2- Create teacher in teachers table
    const { data: teacherData, error: teacherError } = await this._supabase
      .from('teachers')
      .insert({
        profile_id: profileData?.profile?.id,
        ...data,
      })
      .select()
      .single();

    if (teacherError) {
      return { data: null, error: teacherError };
    }
    return {
      data: {
        profile: profileData!.profile,
        teacher: teacherData,
      },
      error: null,
    };
  };

  public async signInWithPassword(
    email: string,
    password: string,
  ): Promise<AuthTokenResponsePassword> {
    const response = await this._supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Refresh cached auth state after signin
    if (!response.error) {
      await this.loadAuthState();
    }

    return response;
  }

  public signInWithGoogle(): Promise<OAuthResponse> {
    return this._supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  /**
   * Sign in with email and password
   * @param email User email
   * @param password User password
   */
  public async signIn(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.signInWithPassword(email, password);
  }

  public async signOut() {
    const response = await this._supabase.auth.signOut();

    // Clear cached auth state after signout
    this._session = null;
    this._user = null;

    return response;
  }

  /**
   * Update user attributes (email, password, data, etc.)
   * @param attributes User attributes to update
   */
  public updateUser(attributes: UserAttributes): Promise<UserResponse> {
    // Not Implemented
    throw new Error('Method not implemented.');
  }

  /**
   * Upload a profile picture to the specific bucket and return the public URL
   * @param file The file to upload
   * @param userId The user's ID
   * @param bucket The bucket name (default: 'avatars')
   */
  private async uploadProfilePicture(
    file: File,
    userId: string,
    bucket: string = 'avatars',
  ): Promise<{ path: string; publicUrl: string }> {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/profile.${fileExt}`;

    const response = await this._supabase.storage.from(bucket).upload(filePath, file, {
      upsert: true,
    });

    if (response.error) {
      throw response.error;
    }

    const { data } = this._supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      path: filePath,
      publicUrl: data.publicUrl,
    };
  }

  /**
   * Helper to update the user's avatar URL in their profile/metadata
   * @param avatarUrl The public URL of the avatar
   */
  public updateProfileAvatar(avatarUrl: string): Promise<UserResponse> {
    return this.updateUser({
      data: { avatar_url: avatarUrl },
    });
  }
}
