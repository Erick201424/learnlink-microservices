import { query } from "./../../../database/mariadb";
import { Event } from "../../domain/entities/event";
import { EventRepository } from "../../domain/repositories/eventRepository";

export class MariaDBRepository implements EventRepository {

    async createEvent(description: string, id_community: number, location: string, date: string, starts_at: string, status: string): Promise<Event | null> {
        try {
            const sql = "INSERT INTO event (description,id_community,location,date,starts_at,status) VALUES (?, ?, ?, ?, ?,'activo')";
            const params: any[] = [description, id_community, location, date, starts_at];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdEvent = new Event(result.insertId, description, id_community, location, date, starts_at, status);
                return createdEvent;
            } else {
                throw new Error("Failed to create the Event. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding Event:", error);
            return null;
        }
    }

    async cancelEvent(id: number): Promise<Event | null> {
        try {
            const sql = "UPDATE event SET status = 'cancelado' WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.affectedRows > 0) {
                const updatedEvent = this.getByIdEvent(id)
                return updatedEvent;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async getByIdEvent(id: number): Promise<Event | null> {
        try {
            const sql = "SELECT * FROM Event WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const getEventById = result.map((data: any) => new Event(
                    data.id,
                    data.description,
                    data.id_community,
                    data.location,
                    data.date,
                    data.starts_at,
                    data.status
                ));
                return getEventById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener horario:', error);
            return null;
        }
    }

    async getAllEvents(): Promise<Event[] | null> {
        try {
            const sql = "SELECT * FROM Event";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Events: any) =>
                new Event(
                    Events.id,
                    Events.description,
                    Events.id_community,
                    Events.location,
                    Events.date,
                    Events.starts_at,
                    Events.status

                )
            );
        } catch (error) {
            return null;
        }
    }
    async getByCommunityId(id_community: number): Promise<Event[] | null> {
        try {
            const sql = "SELECT s.id, s.date, s.starts_at, s.description, su.name as community_name, s.id_community FROM Event s JOIN community su ON s.id_community = su.id WHERE s.id_community = ? AND status='activo'";
            const params: any[] = [id_community];
            console.log(params);
            const result = await query(sql, params);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Event: any) => ({
                id: Event.id,
                description: Event.description,
                date: Event.date,
                id_community: Event.id_community,
                location: Event.location,
                starts_at: Event.starts_at,
                community_name: Event.community_name // Nuevo campo para el nombre del subject
            }));
        } catch (error) {
            console.error('Error al obtener eventos de la comunidad:', error);
            return null;
        }
    }

}