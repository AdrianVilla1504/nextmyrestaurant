/* eslint-disable react-hooks/rules-of-hooks */
import { updateProduct } from '../../services/products';
import { useRouter } from 'next/router';
import { useState } from 'react';
import swal from 'sweetalert';

const DetailEdit = ({ clicktocanceledit, subdetails }) => {

  const router = useRouter();
  const handleEditSuccess = () => {
    router.push("/");
  };
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);

  const handleChangeFile = (evt) => {
    setFile(evt.target.files);
    console.log(evt.target.files);
  };

  const handleClickUpload = async () => {
    const formData = new FormData();

    for (let i= 0; i < file.length; i++){
      formData.append('files', file[i])
    }
    const payload = {
      method: 'POST',
      body: formData,
    };
    try {
      const response = await fetch('http://localhost:8080/api/upload/files', payload);
      const data = await response.json();
      if (data.length) {
        const urls = data.map( (img) => {
          return img.url
        })
        setImg(urls);
      }
    } catch (error) {
      console.log(error);
    }
      swal({
        title: "Upload success",
        text: "Your images has been uploaded succesfully",
        icon: "success",
        button: "Accept",
      });
  };
  console.log("las imagen que vas a mandar al reductor:", img[0]);

  const [ uploadInput, setUploadInput ] = useState({});

  const handleUploadInput = (e) => {
    setUploadInput({ ...uploadInput, [e.target.name]: e.target.value })
  };

  const product = {
    name: uploadInput.name,
    description: uploadInput.description,
    price: uploadInput.price,
    img: img[0]
  }

  const _id = subdetails?._id

  const handleSubmitProduct = async (e) => {
      e.preventDefault();
      try {
        await updateProduct({_id, ...product});
      } catch (error) {
        console.log(error);
      }
  }



  console.log("este es el producto que vas a mandar al back", product);
  return (
  <div>
    { subdetails ?
    (<div className="bg-white py-[7%] px-[20%]">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Upload a product</h3>
              <p className="mt-1 text-sm text-gray-600">
                In this place you can update your product
              </p>
            </div>
            <div className="px-4 sm:px-0">
            <button
                onClick={clicktocanceledit}
                href="#"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 pr-[10px]"
              >
                Cancel edit
              </button>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmitProduct}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Change your product name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block bg-[#a1a1aa] w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                          placeholder={subdetails.name}
                          onChange={handleUploadInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#a1a1aa] text-black"
                        placeholder={subdetails.description}
                        defaultValue={''}
                        onChange={handleUploadInput}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="mt-1">
                      <input
                        type="Number"
                        id="price"
                        name="price"
                        className="mt-1 block w-[100px] h-[40px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#a1a1aa] text-black"
                        placeholder={subdetails.price}
                        defaultValue={''}
                        onChange={handleUploadInput}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload file</label>
                    <input name="file" id="file_input" type="file" onChange={handleChangeFile} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    accept="image/*" />
                  </div>

                  <div>
                    <button type="button" onClick={handleClickUpload} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Click here to save your images
                    </button>
                  </div>

                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={handleEditSuccess}
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update your product
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
    )
    :
    (
    <p>wait....</p>
    )
    }
  </div>
  )
}

export default DetailEdit;
