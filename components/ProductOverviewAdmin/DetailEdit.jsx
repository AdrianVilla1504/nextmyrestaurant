/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { updateProduct } from "../../services/products";
import { useRouter } from "next/router";
import { useState } from "react";
import swal from "sweetalert";

const DetailEdit = ({ clicktocanceledit, subdetails }) => {
  const router = useRouter();
  const handleEditSuccess = () => {
    router.push("/");
  };

  console.log("papa", subdetails.img);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);

  const handleChangeFile = (evt) => {
    setFile(evt.target.files);
    console.log(evt.target.files);
  };

  const handleClickUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }
    const payload = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:8080/api/upload/files",
        payload
      );
      const data = await response.json();
      if (data.length) {
        const urls = data.map((img) => {
          return img.url;
        });
        setImg(urls);
      }
    } catch (error) {
      console.log(error);
    }
    if (img) {
      swal({
        title: "Upload success",
        text: "Your images has been uploaded succesfully",
        icon: "success",
        button: "Accept",
      });
    } else {
      swal({
        title: "An error has ocurred.",
        text: "Your image has an unpload error, please try again.",
        icon: "error",
        button: "Try again",
      });
    }
  };

  if (file) {
    handleClickUpload();
    setFile(null);
  }

  const [uploadInput, setUploadInput] = useState({});

  const handleUploadInput = (e) => {
    setUploadInput({ ...uploadInput, [e.target.name]: e.target.value });
  };

  const product = {
    name: uploadInput.name,
    description: uploadInput.description,
    price: uploadInput.price,
    img: img[0],
  };

  const _id = subdetails?._id;

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const x = await updateProduct({ _id, ...product });

      if (x) {
        swal({
          title: "Updating success",
          text: "Your product has been updated successfully",
          icon: "success",
          button: "Accept",
        }).then(function () {
          router.push('/');
        })
      }

    } catch (error) {
      if (error) {
        swal({
          title: "Error",
          text: "Please check the information and try again",
          icon: "error",
          button: "Try again",
        });
      }
      console.log(error);
    }
  };

  console.log("este es el producto que vas a mandar al back", product);

  return (
    <div>
      {subdetails ? (
        <div className="bg-white py-[10%] px-[20%]">
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Update your product
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Welcome to your update product page{" "}
                  </p>
                </div>
                <div className="px-4 sm:px-0">
                  <button
                    onClick={clicktocanceledit}
                    href="#"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 pr-[10px]"
                  >
                    Cancel update
                  </button>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST" onSubmit={handleSubmitProduct}>
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name of the product
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="block pl-[5px] bg-white h-[30px] w-full flex-1 rounded-md border-[3px] focus:border-[#FF9E00] focus:ring-[#FF9E00] sm:text-sm text-black"
                              placeholder={subdetails?.name}
                              onChange={handleUploadInput}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="mt-1 block w-full pl-[5px] rounded-md border-[3px] shadow-sm focus:border-[#FF9E00] focus:ring-[#FF9E00] sm:text-sm bg-white text-black"
                            placeholder={subdetails?.description}
                            defaultValue={""}
                            onChange={handleUploadInput}
                          />
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          defaultValue={DetailEdit.type}
                          className="mt-1  block text-black w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                          onChange={handleUploadInput}
                        >
                          <option value="FOOD">Food</option>
                          <option value="DRINK">Drink</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <div className="mt-1 flex items-center">
                          <div className="pr-[10px]">
                            <span className="mt-1 w-[30px] h-[40px] rounded-md border-gray-300 shadow-sm focus:border-[#FF9E00] focus:ring-[#FF9E00] sm:text-sm bg-white text-black">
                              ${" "}
                            </span>
                          </div>
                          <input
                            type="Number"
                            id="price"
                            name="price"
                            className="mt-1 block p-[5px] w-[70px] h-[40px] rounded-md border-[3px] shadow-sm focus:border-[#FF9E00] focus:ring-[#FF9E00] sm:text-sm bg-white text-black"
                            placeholder="5"
                            defaultValue={DetailEdit?.price}
                            onChange={handleUploadInput}
                          />
                          <div className="pl-[10px]">
                            <span className="mt-1 w-[30px] h-[40px] rounded-md border-gray-300 shadow-sm focus:border-[#FF9E00] focus:ring-[#FF9E00] sm:text-sm bg-white text-black">
                              {" "}
                              USD
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-[100%]">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="file_input"
                        >
                          Upload file
                        </label>
                        <input
                          name="file"
                          id="file_input"
                          type="file"
                          onChange={handleChangeFile}
                          className="block w-full text-sm text-gray-500 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          accept="image/*"
                        />

                        <div className="w-[100%] py-[20px]">
                          <div className="flex aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                            { product.img ? (
                              <div className="flex flex-col lg:flex-row w-[100%] py-[20px] items-center">
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                  <img
                                    src={product?.img}
                                    alt={product?.name}
                                    className="h-[170px] w-full object-cover group-hover:opacity-75"
                                  />
                                </div>
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-lg font-medium px-[5%] py-[20px] leading-6 text-gray-900">
                                    If you want to change this image, click once
                                    again on select file.
                                  </h3>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col lg:flex-row w-[100%] py-[20px] items-center">
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                  <img
                                    src={subdetails?.img}
                                    alt={product?.name}
                                    className="h-[170px] w-full object-cover group-hover:opacity-75"
                                  />
                                </div>
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-lg font-medium px-[5%] py-[20px] leading-6 text-gray-900">
                                    If you want to change this image, click once
                                    again on select file.
                                  </h3>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#FF9E00] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#E18B00] focus:outline-none focus:ring-2 focus:ring-[#F99A00] focus:ring-offset-2"
                      >
                        Upload your new product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </div>
      ) : (
        <p>wait....</p>
      )}
    </div>
  );
};

export default DetailEdit;
