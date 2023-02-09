// The User model class

// User
// This is the main User entity class
export class User {
  constructor(
      // Whether the user is active or not
      public activated: boolean,
      public authorities: string[],
      // The email address of the user
      public email: string,
      public firstName: string,
      // The language key for the user
      public langKey: string,
      public lastName: string,
      public login: string,
      // The URL of the image of this user
      public imageUrl: string,
      // The auth level for the user
      public authLevel: string,
      // Used to represent the user and act on its behalf
      public accessToken: string,
      // Unique identifier for the user
      public id: string,
      public createdDate: string
  ) {}
}
