import { createOrder,  OrderData, getVenueInfo, getBookableTime } from './api';
import { isTimeRangeWithin } from './utils';

function getUserId() {
  const { data: userData } = JSON.parse(localStorage.getItem('userInfo'));
  return userData.userId;
}

async function choose({
  venueId,
  field,
  callback
}) {

  const data: OrderData = {
    userId: getUserId(),
    couponId: '',
    venueId,
    bookings: [
      field
    ]
  };

  const res = await createOrder(data);
  if (res) {
    callback(true);
  } else {
    callback(false);
  }
}
/**
 *  选定场地以及时间段来筛选
 * @param param0 
 */
export async function run({
  bookingDate,
  venueId,
  needStartTime,
  needEndTime,
  frequency
}) {
  let count = 0;
  const { fields } = await getVenueInfo({ id: venueId });
  const fieldsIdList = fields.map(v => v.id);

  const timer = setInterval(async() => {

    let chooseField = null;
    
    for (const fieldId of fieldsIdList) {
      const filedDetails = await getBookableTime({ id: fieldId });
      const timeSlots = filedDetails.find(v => v.date === bookingDate)?.timeSlots;
      if (!timeSlots) {
        console.log(`没有找到当天的可预约时间`);
      } else {
        for (const timeSlotsItem of timeSlots) {
          const { startTime, endTime, bookable } = timeSlotsItem;
          if (!bookable) {
            continue;
          } else {
            //  找到时间内的
            if (isTimeRangeWithin(startTime, endTime, needStartTime, needEndTime)) {
              chooseField = {
                fieldId,
                startTime,
                endTime,
                venueId,
                bookingDate
              };
              console.log(`找到可用时间段`);
              break;
            }
          }
        }

        if (chooseField) {
          break;
        }
      }
    }

    if (chooseField) {
      await choose({
        venueId,
        field: chooseField,
        callback: (flag) => {
          if (flag) {
            console.log(`成功下单，请去订单页面查看`);
            clearInterval(timer);
          } else {
            count += 1;
            console.log(`下单失败，第${count}次下单`);
          }
        }
      });
    } else {
      console.log(`没有找到符合的场地和时间，第${++count}次抢`);
    }
  }, frequency)
}
