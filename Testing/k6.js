import http from 'k6/http';
// import { Trend } from 'k6/metrics';

// const myTrend = new Trend('waiting_time');

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '60s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  const BASE_URL = "http://localhost:3033"; // make sure this is not production
  const req1 = {
    method: 'GET',
    url: `${BASE_URL}/products/1000/styles`,
  };
  const req2 = {
    method: 'GET',
    url: `${BASE_URL}/products/100000/styles`,
  };
  const req3 = {
    method: 'GET',
    url: `${BASE_URL}/products/1000000/styles`,
  };
  const req4 = {
    method: 'POST',
    url: `${BASE_URL}/add_cart`,
    body: {
      "sku_id": 3,
      }
    };
    const req5 = {
      method: 'POST',
      url: `${BASE_URL}/add_cart`,
      body: {
        "sku_id": 1,
      }
    };
    const req6 = {
      method: 'POST',
      url: `${BASE_URL}/add_cart`,
      body: {
        "sku_id": 5,
      },
    };


  //const responses = http.batch([req1, req2, req3]);
   const responses = http.batch([req4, req5, req6]);

  // var r = http.get(`${BASE_URL}/products/1000/styles`);
  // myTrend.add(r.timings.waiting);
  // console.log(myTrend.name);
  // r = http.get(`${BASE_URL}/products/100000/styles`);
  // myTrend.add(r.timings.waiting);
  // console.log(myTrend.name);
  // r = http.get(`${BASE_URL}/products/1000000/styles`);
  // myTrend.add(r.timings.waiting);
  // console.log(myTrend.name);
}