import { Router } from "express";
import { expenseController } from "../controllers/expense.controller";
import { validateRequest } from "../middleware/validateRequest";
import {
  groupAndUserIdParamSchema,
  groupIdParamSchema,
  expenseIdParamSchema,
  createExpenseSchema,
  updateExpenseSchema,
  getExpenseListSchema,
} from "../schemas/expense.schema";
const router = Router();

router.post(
  "/:groupId/create",
  validateRequest({ params: groupIdParamSchema, body: createExpenseSchema }),
  expenseController.createExpense
);
router.get(
  "/:id",
  validateRequest({ params: expenseIdParamSchema }),
  expenseController.getExpense
);
router.get(
  "/:groupId/list",
  validateRequest({ params: groupIdParamSchema, query: getExpenseListSchema }),
  expenseController.getExpenseList
);
router.post(
  "/:groupId/delete/:id",
  validateRequest({ params: groupAndUserIdParamSchema }),
  expenseController.deleteExpense
);
router.put(
  "/:groupId/update/:id",
  validateRequest({
    params: groupAndUserIdParamSchema,
    body: updateExpenseSchema,
  }),
  expenseController.updateExpense
);

export { router as expenseRouter };
