export interface IReportItem {
    id: number;
    reporterId: string;
    // priority: string;
    location: string;
    // equipment: string;
    assigneeId: string;
    note: string; // details
    time: string; // createdAt
    status: string; // OPEN - IN_PROGRESS - RESOLVED
  }

export interface IGetALlReportPayload {
  accountId: string
}

export interface IReportLocation {
  id: string;
  building: string;
  floor: string;
  room: string;
}

export interface ILectorHallResponse {
  id: string;
  building: string;
  floor: string;
  room: string;
  createdAt: string;
  createdLog: string;
  createdBy: string;
  updatedAd: string;
  updatedLog: string;
  updatedBy: string;
}

export interface IReportResponse {
  id: string;
  reporterId: string;
  assignedSupervisorId: string;
  lectureHall: ILectorHallResponse;
  details: string
  priority: string;
  critical: string;
  stage: string; // OPEN - IN_PROGRESS - RESOLVED
  createdAt: string;
  updateAt: string;
}

export interface IGetAllReportResponse {
  code: number;
  result: IReportResponse[];
}

export interface IUpdateReportResponse {
  code: number;
  result: IReportResponse;
}

export interface IAssignJobResponse {
  code: number;
  result: IReportResponse;
}

export interface IAssignJobPayload {
  id: string;
  accountId: string;
  assignedSupervisorId: string;
  stage: string
}

export interface IUpdateStagePayload {
  id: string
  accountId: string
  assignedSupervisorId: string
  stage: string // OPEN - IN_PROGRESS - RESOLVED
}

export interface IGetReportResolvedByMonthPayload {
  year: number
}

export interface IGetReportResolvedByMonthResponse {
  monthlyReportCounts: {
    January: number;
    February: number;
    March: number;
    April: number;
    May: number;
    June: number;
    July: number;
    August: number;
    September: number;
    October: number;
    November: number;
    December: number;
  }
}

export interface ISupervisorRating {
  supervisorId: string;
  rating: number;
}

export interface IGetAverageRatingResponse {
  supervisorRatings: ISupervisorRating[]
}

export interface ICreateReportPayload {
  reporterId: string,
  lectureHall: {
    id: number
    building: string,
    floor: string,
    room: string
  },
  details: string,
  priority: string,
  critical: true,
  stage: string  // OPEN - IN_PROGRESS - RESOLVED
}

export interface ICreateReportResponse {
  code: number;
  // message: string;
  result: IReportResponse;
}

export interface ILectureHall {
  lectureHall: {
    id: number;
    building: string;
    floor: string;
    room: string;
  }
}

export interface ILectureHallResponse {
  code: number;
  result: ILectureHall[];
}

export interface IUsingLectureHall {
  id: number;
    building: string;
    floor: string;
    room: string;
}