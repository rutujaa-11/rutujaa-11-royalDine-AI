class TableOptimizer:

    def suggest_table(self, guests: int) -> str:
        if guests <= 2:
            return "We recommend a 2-seater table."
        elif guests <= 4:
            return "We recommend a 4-seater table."
        elif guests <= 6:
            return "We recommend a 6-seater table."
        else:
            return "For large groups, we suggest a family table or two combined tables."
