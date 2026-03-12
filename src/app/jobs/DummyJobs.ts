import { Job } from "bee-queue";

class DummyJob {
    get key(): string {
        return "DummyJob"
    }

    // declare the expected data payload structure
    async handle(job: Job<{ message: string }>) {
        const { message } = job.data;
        console.log("DummyJob executado com os dados:", message);
    }
}

export default new DummyJob()