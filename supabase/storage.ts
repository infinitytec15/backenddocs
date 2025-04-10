import { supabase } from "./supabase";

export type StorageBucket = "documents" | "contracts";

/**
 * Upload a file to a Supabase storage bucket
 * @param bucket The storage bucket to upload to ("documents" or "contracts")
 * @param filePath The path where the file will be stored in the bucket
 * @param file The file to upload
 * @param onProgress Optional callback for upload progress
 * @returns Object containing data and error properties
 */
export async function uploadFile(
  bucket: StorageBucket,
  filePath: string,
  file: File,
  onProgress?: (progress: number) => void,
) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        onUploadProgress: (progress) => {
          if (onProgress) {
            const percent = (progress.loaded / progress.total) * 100;
            onProgress(percent);
          }
        },
      });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { data: null, error };
  }
}

/**
 * Download a file from a Supabase storage bucket
 * @param bucket The storage bucket to download from ("documents" or "contracts")
 * @param filePath The path of the file in the bucket
 * @returns Object containing data and error properties
 */
export async function downloadFile(bucket: StorageBucket, filePath: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error downloading file:", error);
    return { data: null, error };
  }
}

/**
 * Get a public URL for a file in a Supabase storage bucket
 * @param bucket The storage bucket containing the file ("documents" or "contracts")
 * @param filePath The path of the file in the bucket
 * @param expiresIn Number of seconds until the URL expires (default: 60)
 * @returns The public URL for the file
 */
export function getFileUrl(
  bucket: StorageBucket,
  filePath: string,
  expiresIn = 60,
) {
  const { data } = supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);
  return data?.signedUrl;
}

/**
 * Delete a file from a Supabase storage bucket
 * @param bucket The storage bucket containing the file ("documents" or "contracts")
 * @param filePath The path of the file in the bucket
 * @returns Object containing data and error properties
 */
export async function deleteFile(bucket: StorageBucket, filePath: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { data: null, error };
  }
}
