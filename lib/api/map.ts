import axios from './index';

type GetLocationInfoAPIResponse = {
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longitude: number;
  };

export const getLocationAPI = async ({
    latitude,
    longitude
}: {
    latitude: number;
    longitude: number;
}) => {
    return axios.get<GetLocationInfoAPIResponse>(`/location?latitude=${latitude}&longitude=${longitude}`);
};
