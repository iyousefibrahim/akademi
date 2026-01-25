import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import {
  AuthResponse,
  AuthTokenResponsePassword,
  OAuthResponse,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabaseClient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _supabase = supabase;

  get session() {
    return from(this._supabase.auth.getSession());
  }

  get user() {
    return from(this._supabase.auth.getUser());
  }

  /**
   * Sign up with email and password
   * @param email User email
   * @param password User password
   * @param data Optional user metadata
   */
  signUp(email: string, password: string, data?: object): Observable<AuthResponse> {
    return from(
      this._supabase.auth.signUp({
        email,
        password,
        options: { data },
      }),
    );
  }

  signInWithPassword(email: string, password: string): Observable<AuthTokenResponsePassword> {
    return from(
      this._supabase.auth.signInWithPassword({
        email,
        password,
      }),
    );
  }

  signInWithGoogle(): Observable<OAuthResponse> {
    return from(
      this._supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      }),
    );
  }

  signOut() {
    return from(this._supabase.auth.signOut());
  }

  /**
   * Update user attributes (email, password, data, etc.)
   * @param attributes User attributes to update
   */
  updateUser(attributes: UserAttributes): Observable<UserResponse> {
    return from(this._supabase.auth.updateUser(attributes));
  }

  // /**
  //  * Upload a profile picture to the specific bucket and return the public URL
  //  * @param file The file to upload
  //  * @param userId The user's ID
  //  * @param bucket The bucket name (default: 'avatars')
  //  */
  // uploadProfilePicture(
  //   file: File,
  //   userId: string,
  //   bucket: string = 'avatars',
  // ): Observable<{ path: string; publicUrl: string }> {
  //   const fileExt = file.name.split('.').pop();
  //   const filePath = `${userId}/profile.${fileExt}`;

  //   return from(
  //     this._supabase.storage.from(bucket).upload(filePath, file, {
  //       upsert: true,
  //     }),
  //   ).pipe(
  //     map((response) => {
  //       if (response.error) {
  //         throw response.error;
  //       }

  //       const { data } = this._supabase.storage.from(bucket).getPublicUrl(filePath);

  //       return {
  //         path: filePath,
  //         publicUrl: data.publicUrl,
  //       };
  //     }),
  //   );
  // }

  // /**
  //  * Helper to update the user's avatar URL in their profile/metadata
  //  * @param avatarUrl The public URL of the avatar
  //  */
  // updateProfileAvatar(avatarUrl: string): Observable<UserResponse> {
  //   return this.updateUser({
  //     data: { avatar_url: avatarUrl },
  //   });
  // }
}
