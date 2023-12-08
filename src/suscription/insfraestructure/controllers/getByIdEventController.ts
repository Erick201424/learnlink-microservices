import { Request, Response } from "express";
import { GetByIdEventUseCase } from "../../application/getByIdEventUseCase";
import axios from "axios";

export class GetByIdEventController {
    constructor(readonly getByIdEventUseCase: GetByIdEventUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const listSuscriptions = await this.getByIdEventUseCase.execute(id);

            if (!Array.isArray(listSuscriptions) || listSuscriptions.length === 0) {
                console.log("No subscriptions found for the specified event ID.");
                return res.status(404).send({
                    status: "error",
                    message: "No subscriptions found for the specified event ID.",
                });
            }

            console.log("Suscriptions:", listSuscriptions);
            console.log("Number of suscriptions:", listSuscriptions.length);

            const userIds: number[] = listSuscriptions.map((subscription: any) => subscription.user);
            console.log("UserIds:", userIds);

            try {
                const studentsResponse = await axios.post(
                    `https://apigateway.learnlinked.net/api/v1/user_services/user/students/assitance`,
                    {
                        userIds: userIds,
                    }
                );

                console.log("Request to student service successful. Response:", studentsResponse.data);

                if (studentsResponse.data.status === "succes") {
                    const userDataList = studentsResponse.data.data.studentList.map((student: any) => ({
                        name: student.name,
                        lastname: student.lastname,
                        phone: student.phone,
                        // Agregar más campos según sea necesario
                    }));

                    return res.status(200).send({
                        status: "success",
                        data: {
                            event_id: id,
                            users: userDataList,
                            message: "User data retrieved successfully.",
                        },
                    });
                } else {
                    console.error("Error in student service response:", studentsResponse.data);
                    return res.status(500).send({
                        status: "error",
                        message: "An error occurred while fetching user data.",
                    });
                }

            } catch (error) {
                console.error("Error making request to student service:", error);
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while fetching user data.",
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    console.error("Validation failed:", error.message);
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message),
                    });
                }
            }

            console.error("Error fetching event:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching the Event.",
            });
        }
    }
}
