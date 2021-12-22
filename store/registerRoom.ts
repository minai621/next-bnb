import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterRoomState } from '../types/reduxState';
import { BedType } from '../types/room';

//* 초기 상태
const initialState: RegisterRoomState = {
    //* 건물유형 큰 범주
    largeBuildingType: null,
    //* 건물유형
    buildingType: null,
    //* 숙소유형
    roomType: null,
    //* 게스트만을 위해 만들어진 숙소인가
    isSetUpForGuest: null,
    //* 최대 숙박 인원
    maximumGuestCount: 1,
    //* 침실 개수
    bedroomCount: 0,
    //* 침대 개수
    bedCount: 1,
    //* 침대 유형
    bedList: [],
    //* 공용공간 침대 유형
    publicBedList: [],
    //* 욕실 개수
    bathroomCount: 1,
    //* 욕실 유형
    bathroomType: null,
    //* 국가/지역
    country: '',
    //* 시/도
    city: '',
    //* 시/군/구
    district: '',
    //* 도로명주소
    streetAddress: '',
    //* 동호수
    detailAddress: '',
    //* 우편번호
    postcode: '',
    //* 위도
    latitude: 0,
    //* 경도
    longitude: 0,
    //* 편의시설
    amentities: [],
    //* 편의공간
    conveniences: [],
    //* 편의공간
    photos: [],
    //* 숙소 설명
    description: '',
    //* 숙소 제목
    title: '',
    //* 숙소 요금
    price: 0,
    //* 예약 시작 날짜
    startDate: null,
    //* 예약 마감 날짜
    endDate: null,
  };

const registerRoom = createSlice({
    name: 'registerRoom',
    initialState,
    reducers: {
        setLargeBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === '') {
              state.largeBuildingType = null;
            }
            state.largeBuildingType = action.payload;
            return state;
          },
        setBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === '') {
                state.buildingType = null;
            }
            state.buildingType = action.payload;
            return state;
        },
        setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
          state.roomType = action.payload;
          return state;
        },
        setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
            state.isSetUpForGuest = action.payload;
            return state;
        },
        setMaximumGuestCount(state, action: PayloadAction<number>) {
            state.maximumGuestCount = action.payload;
            return state;
        },
        setBedroomCount(state, action: PayloadAction<number>) {
            const bedroomCount = action.payload;
            let { bedList } = state;

            state.bedroomCount = bedroomCount;

            if (bedroomCount < bedList.length) {
                bedList = state.bedList.slice(0, bedroomCount);
            } else {
                for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
                    bedList.push({ id: i, beds: [] });
                }
            }
            state.bedList = bedList;
            return state;
        },
        setBedCount(state, action: PayloadAction<number>) {
            state.bedCount = action.payload;
            return state;
        },
        setBedTypeCount(
            state,
            action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
          ) {
            const { bedroomId, type, count } = action.payload;

            const bedroom = state.bedList[bedroomId - 1];

            const prevBeds = bedroom.beds;
            const index = prevBeds.findIndex((bed) => bed.type === type);
            if (index === -1) {
              //* 타입이 없다면
              state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
              return state;
            }
            //* 타입이 존재한다면
            if (count === 0) {
              state.bedList[bedroomId - 1].beds.splice(index, 1);
            } else {
              state.bedList[bedroomId - 1].beds[index].count = count;
            }
            return state;
          },
        setPublicBedTypeCount(
            state,
            action: PayloadAction<{ type: BedType; count: number }>
          ) {
            const { type, count } = action.payload;

            const index = state.publicBedList.findIndex((bed) => bed.type === type);
            if (index === -1) {
              //* 타입이 없다면
              state.publicBedList = [...state.publicBedList, { type, count }];
              return state;
            }
            //* 타입이 존재한다면
            if (count === 0) {
              state.publicBedList.splice(index, 1);
            } else {
              state.publicBedList[index].count = count;
            }
            return state;
        },
        setBathroomCount(state, action: PayloadAction<number>) {
            state.bathroomCount = action.payload;
        },
        setBathroomType(state, action: PayloadAction<'private' | 'public'>) {
            state.bathroomType = action.payload;
        },
        setCountry(state, action: PayloadAction<string>) {
          state.country = action.payload;
        },
        setCity(state, action: PayloadAction<string>) {
          state.city = action.payload;
        },
        setDistrict(state, action: PayloadAction<string>) {
          state.district = action.payload;
        },
        setStreetAddress(state, action: PayloadAction<string>) {
          state.streetAddress = action.payload;
        },
        setDetailAddress(state, action: PayloadAction<string>) {
          state.detailAddress = action.payload;
        },
        setPostcode(state, action: PayloadAction<string>) {
          state.postcode = action.payload;
        },
        setLatitude(state, action: PayloadAction<number>) {
          state.latitude = action.payload;
        },
        setLongitude(state, action: PayloadAction<number>) {
          state.longitude = action.payload;
        },
        setAmentities(state, action: PayloadAction<string[]>) {
          state.amentities = action.payload;
        },
        setConveniences(state, action: PayloadAction<string[]>) {
          state.conveniences = action.payload;
        },
        setPhotos(state, action: PayloadAction<string[]>) {
          state.photos = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
          state.description = action.payload;
        },
        setTitle(state, action: PayloadAction<string>) {
          state.title = action.payload;
        },
        setPrice(state, action: PayloadAction<number>) {
          state.price = action.payload;
        },
        setStartDate(state, action: PayloadAction<string | null>) {
          state.startDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string | null>) {
          state.endDate = action.payload;
        },
    }
});

export const registerRoomActions = { ...registerRoom.actions };
export default registerRoom;
