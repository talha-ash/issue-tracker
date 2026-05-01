import * as v from 'valibot';

export const CreateProjectSchema = v.object({
  name: v.pipe(
    v.string('Name is required'),
    v.trim(),
    v.minLength(2, 'Name is too short')
  ),
  key: v.pipe(
    v.string('Key is required'),
    v.trim(),
    v.minLength(2, 'Key must be at least 2 characters'),
    v.maxLength(20, 'Key must be at most 20 characters'),
    v.regex(
      /^[A-Z][A-Z0-9]*$/,
      'Key must start with an uppercase letter and contain only uppercase letters and digits'
    )
  ),
  description: v.pipe(
    v.string('Description is required'),
    v.trim(),
    v.minLength(4, 'Description is required')
  ),
  visibility: v.picklist(['private', 'public'], 'Visibility is required'),
});
