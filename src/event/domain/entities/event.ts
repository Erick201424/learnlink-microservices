export class Event {
    constructor(
        public id: number,
        public description: string,
        public id_community: number,
        public location: string,
        public date: string,
        public starts_at:string,
        public status:string
    ) { }
}

