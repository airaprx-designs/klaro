import { notFound } from "next/navigation";
import { TASKS, getTaskBySlug } from "@/lib/tasks/config";
import { TaskFlow } from "@/components/task/TaskFlow";

export function generateStaticParams() {
  return TASKS.map((t) => ({ taskSlug: t.slug }));
}

export default function TaskPage({
  params
}: {
  params: { taskSlug: string };
}) {
  const task = getTaskBySlug(params.taskSlug);
  if (!task) notFound();
  return <TaskFlow task={task} />;
}
