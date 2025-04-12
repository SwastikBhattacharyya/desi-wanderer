import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as motion from "motion/react-client";
import EditorForm from "./_components/editor-form";

export default function EditorPage() {
  return (
    <motion.div
      className="flex min-h-screen min-w-screen p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="w-full">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-4xl font-bold">Editor</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="h-full">
          <EditorForm />
        </CardContent>
      </Card>
    </motion.div>
  );
}
