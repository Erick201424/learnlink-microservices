export class Schedule {
    constructor(
        public id: number,
        public day: string,
        public start_at: string,
        public end_at: string,
        public idsubject: number,
        public iduser: number
    ) { }
}

