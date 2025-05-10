import { preload } from './preload';
import { run } from './actions';

;(async() => {
  await preload();
  
  await run({
    bookingDate: window.dayjs().format('YYYY-MM-DD'),
    venueId: '10',
    needStartTime: '10:00',
    needEndTime: '12:00',
    frequency: 500
  });
})();
