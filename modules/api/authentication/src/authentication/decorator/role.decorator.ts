import { SetMetadata } from '@nestjs/common';

export const ROLE_GUARD = "ROLE_GUARD";

export const Role = (role: string) => SetMetadata(ROLE_GUARD, role);
