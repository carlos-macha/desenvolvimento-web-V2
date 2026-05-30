import {
    Request,
    Response,
    NextFunction
} from "express";

import GroupService from "../services/groupService";

import {
    GroupBody,
    GroupParams
} from "../types/groupType";

class GroupController {

    constructor(
        private groupService: GroupService = new GroupService()
    ) { }

    public listGroups = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const groups =
                await this.groupService.findAll();

            return res.json(groups);

        } catch (error) {

            next(error);
        }
    };

    public createGroup = async (
        req: Request<{}, {}, GroupBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const {
                DESCRICAO
            } = req.body;

            const group =
                await this.groupService.create(
                    DESCRICAO
                );

            return res
                .status(201)
                .json(group);

        } catch (error) {

            next(error);
        }
    };

    public findGroupByCode = async (
        req: Request<GroupParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const group =
                await this.groupService.findByCode(
                    CODIGO
                );

            return res.json(group);

        } catch (error) {

            next(error);
        }
    };

    public editGroup = async (
        req: Request<GroupParams, {}, GroupBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const {
                DESCRICAO
            } = req.body;

            const group =
                await this.groupService.update(
                    CODIGO,
                    DESCRICAO
                );

            return res.json(group);

        } catch (error) {

            next(error);
        }
    };

    public deleteGroup = async (
        req: Request<GroupParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const result =
                await this.groupService.delete(
                    CODIGO
                );

            return res.json(result);

        } catch (error) {

            next(error);
        }
    };
}

export default GroupController;