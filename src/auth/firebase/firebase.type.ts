export interface FirebaseResponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
}

export interface FirebaseFailedResponse {
  error: {
    code: number;
    message: string;
    errors: any[];
  };
}
