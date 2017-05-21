export default function uploadImageCallBack(file) {
	console.log('file===>',file)
  return new Promise(
    (resolve, reject) => {
      resolve({ data: { link: "localhost:8081/upload/uploadFile" } });
    }
  );
}