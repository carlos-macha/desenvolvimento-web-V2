import { Router } from "express"

import GroupController from "../controllers/groupController"

const groupController =
    new GroupController()

const groupRouter =
    Router()

groupRouter.get(
    "/grupos",
    groupController.listGroups.bind(groupController)
)

groupRouter.post(
    "/grupos",
    groupController.createGroup.bind(groupController)
)

groupRouter.put(
    "/grupos/:codigo",
    groupController.editGroup.bind(groupController)
)

groupRouter.delete(
    "/grupos/:codigo",
    groupController.deleteGroup.bind(groupController)
)

export default groupRouter