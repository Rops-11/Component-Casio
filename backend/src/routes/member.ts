import express from "express";
import MemberController from "../controllers/memberController";

const router = express();
const memberController = new MemberController();

router.get("/", memberController.getAllMembers);
router.post("/", memberController.createMember);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

export default router;

