import { Region } from '@domain/region/region';
import { InvalidBirthFormatException } from '@domain/user/exception/invalid-birth-format.exception';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class UserInfo {
  private gender?: Gender;
  private birth?: string;
  private region?: Region;

  constructor(
    gender: Gender = null,
    birth: string = null,
    region: Region = null,
  ) {
    this.gender = gender;
    this.setBirth(birth);
    this.region = region;
  }

  setGender(gender: Gender) {
    this.gender = gender;
  }

  getGender(): Gender {
    return this.gender;
  }

  setBirth(birth: string) {
    if (!birth.match(/^\d{4}-\d{2}-\d{2}$/))
      throw new InvalidBirthFormatException();
    this.birth = birth;
  }

  getBirth(): string {
    return this.birth;
  }

  setRegion(region: Region) {
    this.region = region;
  }

  getRegion(): Region {
    return this.region;
  }
}
