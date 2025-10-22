export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  education: string;
  nationalId: string;
  birthDate: string; // Stored as Jalali formatted string YYYY/MM/DD
  profilePhoto?: string; // base64 image data URL
}
