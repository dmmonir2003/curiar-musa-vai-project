import React from 'react'

const DriverActiveDataInner = ({pagetype, status, page, job}) => {
    const statusManual = job?.id == 3 && page == "shipments" ? "Cancelled" : "Delivered";
  return (
    <div>
       <div className="flex justify-between items-center">
        <div className={`job_top flex items-center ${pagetype == 'newjobspage' ? 'gap-1': 'gap-3'} w-full`}>
          <div className="job_route">
            <div className="text-[15px] font-normal">Barcelona</div>
            <span className="text-[11px] font-normal text-[var(--light-color-text)]">
              5 Feb, 2:00 PM
            </span>
          </div>
          <div className="route_line flex items-center">
            <span className="route_circle"></span>
            <span className={`${pagetype == 'newjobspage' ? 'line_route_small': 'line_route_full'}`}></span>
            <span className="route_circle"></span>
          </div>
          <div className="job_route">
            <div className="text-[15px] font-normal">Tanglewood Ave</div>
            <span className="text-[11px] font-normal text-[var(--light-color-text)]">
              5 Feb, 2:00 PM
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3 items-center">
          {page != "jobslisting" && (
            <>
              <div className="border border-[var(--primary-color)] h-[33px] w-[52px] rounded-full flex justify-center items-center bg-[var(--primary-color)]">
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.75 16.5V9H10.25V16.5M1.25 6.75L8 1.5L14.75 6.75V15C14.75 15.3978 14.592 15.7794 14.3107 16.0607C14.0294 16.342 13.6478 16.5 13.25 16.5H2.75C2.35218 16.5 1.97064 16.342 1.68934 16.0607C1.40804 15.7794 1.25 15.3978 1.25 15V6.75Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                className={`${
                  statusManual == "Cancelled"
                    ? "bg-[#FF3B30]"
                    : "bg-[var(--primary-color)]"
                } text-[11px] p-1 px-4 rounded-full text-white`}
              >
                {page == "shipments" ? statusManual : status}
              </div>
            </>
          )}

          <div className={`job_top flex items-center gap-5 w-full ${pagetype == 'newjobspage' ? 'flex-col': 'flex-row'}`}>
            <div className="job_route">
              <div className="text-[13px] font-normal text-[#00000080]">
                Available, kg
              </div>
              <span className="text-[11px] font-normal text-[var(--light-color-text)]">
                20 / 200
              </span>
            </div>
            <div className="job_route">
              <div className="text-[13px] font-normal text-[#00000080]">
                {page != "jobslisting" ? "Shipment number" : "Total Distance"}
              </div>
              <span className="text-[11px] font-normal text-[var(--light-color-text)]">
                {page != "jobslisting" ? "V4123142" : "30KM"}
              </span>
            </div>
          </div>
        </div>
        <div className="font-bold text-3xl text-[var(--primary-color)]">
          $7000
        </div>
      </div>
    </div>
  )
}

export default DriverActiveDataInner
