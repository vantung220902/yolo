import { useFormik } from 'formik';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from 'redux/authRedux/actions';
import { defaultSize } from 'services/ui';
import * as yup from 'yup';
import 'yup-phone';
import Photo from '../../assets/photo.png';

import { IRootReducers } from '../../redux/rootReducer';
const Profile = () => {
  const user = useSelector((state: IRootReducers) => state.auth.user);
  const [url, setUrl] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup.string().min(4).required(),
    address: yup.string().min(4).required(),
    phone: yup.string().phone().required(),
    email: yup.string().email().required(),
  });
  useEffect(() => {
    return () => URL.revokeObjectURL(imagePreview as string);
  }, [imagePreview]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setUrl(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.svg', '.jpeg'],
    },
    maxFiles: 1,
    multiple: false,
  });
  const formik = useFormik({
    initialValues: {
      name: user?.fullName || '',
      address: user?.address || '',
      phone: user?.phone || '',
      email: user?.email || '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: schema,
    enableReinitialize: true,
  });
  const handleSubmit = (values: ReturnType<() => typeof formik.initialValues>) => {
    dispatch(
      updateUserAsync.request({
        ...values,
        image: url,
      }),
    );
  };
  const renderError = (message: string) => (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
  return (
    <div className="col-span-9 h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-7">
          <h4 className="text-lg font-bold">Hello {user?.fullName || user?.username} :D</h4>
          <h5>Have a nice day!</h5>
          <div>
            <div className="my-12">
              <h4 className="font-bold">Setting your profile</h4>
              <div className="flex items-center my-4">
                <img
                  src={imagePreview || user?.avatar}
                  alt="Anh"
                  className="w-44 h-44 p-1 rounded-full"
                />
                <div className="flex flex-col justify-center ml-6">
                  <button
                    {...getRootProps()}
                    className="bg-[#7151F2] text-white font-bold py-2 px-4 rounded"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the files here ...</p> : <p>Chang Avatar</p>}
                  </button>
                  <button
                    className={`bg-white border-2 border-gray-500 shadow-md 
                      text-black font-bold py-2 px-4 rounded flex items-center my-2 cursor-pointer ${
                        !imagePreview && 'opacity-50 cursor-not-allowed'
                      }`}
                    disabled={!imagePreview}
                    onClick={() => {
                      URL.revokeObjectURL(imagePreview as string);
                      setImagePreview(undefined);
                    }}
                  >
                    <BsTrash size={defaultSize} className="text-red-600" />
                    <p> Delete Avatar</p>
                  </button>
                </div>
              </div>

              <p className="text-gray-400">
                Choose the picture. Recommend the picture size 256 x 256px
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
                {formik.errors.name && formik.touched.name && renderError(formik.errors.name)}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
                {formik.errors.address &&
                  formik.touched.address &&
                  renderError(formik.errors.address)}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <div className="flex items-center">
                  <div className="w-full">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light bg-[#F2F3F7]"
                      placeholder="name@flowbite.com"
                      disabled
                    />
                    {formik.errors.email &&
                      formik.touched.email &&
                      renderError(formik.errors.email)}
                  </div>

                  <button
                    type="button"
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-6"
                  >
                    Modifier
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your phone
                </label>
                <input
                  type={'tel'}
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
                {formik.errors.phone && formik.touched.phone && renderError(formik.errors.phone)}
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed"
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-5 h-fit flex">
          <div className="w-[50%]">
            <h5 className="font-bold mb-2">Just be confident</h5>
            <p className="text-gray-400 text-justify text-md">
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
          </div>
          <div className="w-[50%]">
            <img src={Photo.src} alt="anh" className="w-48 h-48 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
