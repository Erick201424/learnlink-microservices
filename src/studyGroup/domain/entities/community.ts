export class Community {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public description: string,
        public iduser: number,
    ) { }
}

export class CommunityWithStudent {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public description: string,
        public iduser: number,
        public studentData?: any  // Puedes ajustar el tipo según la estructura real
    ) { }
}

