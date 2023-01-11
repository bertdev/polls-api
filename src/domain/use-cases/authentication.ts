export interface Authentication {
  auth: (email: string, passwor: string) => Promise<string>
}
