export interface ValidationError {
  field: string;
  message: string;
}

export const validateRegister = (
  name: string,
  username: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!username.trim()) {
    errors.push({ field: 'username', message: 'Username is required' });
  } else if (username.trim().length < 3) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters' });
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push({
      field: 'username',
      message: 'Username can only contain letters, numbers, and underscores',
    });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  return errors;
};

export const validateLogin = (
  username: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!username.trim()) {
    errors.push({ field: 'username', message: 'Username is required' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};