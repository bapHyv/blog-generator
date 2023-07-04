import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ImCross } from 'react-icons/im';

export const GET_PHOTOS = gql`
  query Query {
    getAllImagesFromWriter {
      id
      createdAt
      url
    }
  }
`;

const ADD_PHOTOS = gql`
  mutation Mutation($url: String!) {
    addOneImage(url: $url) {
      id
      createdAt
      url
    }
  }
`;

export const DELETE_PHOTO = gql`
  mutation Mutation($deleteOneImageId: Int!) {
    deleteOneImage(id: $deleteOneImageId) {
      id
      createdAt
      url
    }
  }
`;

interface IPhoto {
  id: number;
  createdAt: string;
  url: string;
}

interface IDataPhotos {
  getAllImagesFromWriter: IPhoto[];
}

const PhotosManager = () => {
  const cloudName = 'dr0zu0121';
  const uploadPreset = 'blogGenerator';

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dr0zu0121',
    },
  });

  const { data, loading, refetch } = useQuery<IDataPhotos>(GET_PHOTOS);
  const [deletePhoto] = useMutation(DELETE_PHOTO);
  const [addImage] = useMutation(ADD_PHOTOS);

  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset,
    },
    async (error: Error, result: any) => {
      if (!error && result && result.event === 'success') {
        await addImage({ variables: { url: result.info.public_id } });
        await refetch();
      }
    },
  );

  const handleDeletePhoto = async (deleteImageId: number) => {
    await deletePhoto({ variables: { deleteOneImageId: deleteImageId } });
    await refetch();
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="text-3xl text-center underline text-ronniecolman">Photos Manager</h1>
        <button
          className="p-2 my-5 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => uploadWidget.open()}
        >
          Upload a Photo
        </button>
        <div className="p-2 overflow-y-scroll flex flex-wrap max-h-[50vh] bg-neutral-200 gap-2">
          {!loading &&
            data?.getAllImagesFromWriter.map((img) => {
              const cldImg = cld.image(img.url);
              return (
                <div className="relative" key={img.id}>
                  <div
                    className="absolute p-1 bg-red-600 rounded-full cursor-pointer top-1 right-1"
                    onClick={() => handleDeletePhoto(img.id)}
                  >
                    <ImCross className="w-2 h-2 text-white" />
                  </div>
                  <AdvancedImage cldImg={cldImg} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PhotosManager;
