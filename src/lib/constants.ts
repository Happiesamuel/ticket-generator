export const resizeCloudinaryImage = (
  imageUrl: string,
  width = 300,
  height = 300
) => {
  return imageUrl.replace("/upload/", `/upload/w_${width},h_${height},c_fill/`);
};
