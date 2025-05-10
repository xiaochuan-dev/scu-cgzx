import { apiService } from './http';

type VenueListItme = {
  id: string;
  location: string;
  name: string;
}

/**
 * 获取场地列表
 * @param params , 获取所有校区的场地campusId===null, 望江校区1 华西校区2 江安校区3
 * @returns 
 */
export async function getVenueList(params: { campusId?: string }) {
  const path = '/app-api/venue/venue/list';
  const res = await apiService.get<VenueListItme[]>({ path, params });
  return res;
}

type FieldsItem = {
  /**
   * 节假日开放
   */
  holidayEnabled: 0 | 1;
  /**
   * 晚上开放
   */
  eveningEnabled: 0 | 1;

  id: string;
  name: string;
  status: string;
  venueId: string;

}

type VenueInfo = {
  campusId: string;
  fields: FieldsItem[];
  id: string;
  location: string;
  name: string;
}
/**
 * 
 * @param params id是VenueId
 * @returns 
 */
export async function getVenueInfo(params: { id: string }) {
  const path = '/app-api/venue/venue/info';
  const res = await apiService.get<VenueInfo>({ path, params });
  return res;
}


/**
 * 一天中的时间段
 */
type TimeSlot = {
  startTime: string;
  endTime: string;
  bookable: boolean;
  status: string;
}

export type BookTimeItem = {
  /**
   * 日期
   */
  date: string;
  timeSlots: TimeSlot[];
}

/**
 * 
 * @param params 这里的id是FieldsItemId
 */
export async function getBookableTime(params: { id: string }) {
  const path = `/app-api/venue/field/get-bookable-times/${params.id}`;
  const res = await apiService.get<BookTimeItem[]>({ path });
  return res;
}

export type BookingItem = {
  bookingDate: string;
  endTime: string;
  fieldId: string;
  startTime: string;
  venueId: string;
}

export type OrderData = {
  bookings: BookingItem[];
  couponId: string;     // 默认是空字符串
  userId: string;
  venueId: string;
}

export async function createOrder(data: OrderData) {
  const path = '/app-api/venue/booking/orders/create';
  const res = await apiService.post({ path, data });
  return res?.orderNo;
}
