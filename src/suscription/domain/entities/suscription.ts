export class Suscription {
    constructor(
        public id: number,
        public id_event: number,
        public id_user: number,
    ) { }
}

export class SuscriptionWithUsers {
    constructor(
        public id: number,
        public id_event: number,
        public id_user: number,
        public studentData?: any  // Puedes ajustar el tipo según la estructura real
    ) { }
}



