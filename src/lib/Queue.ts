import Bee from "bee-queue"
import DummyJob from "../app/jobs/DummyJobs"
import WelcameEmailJob from "../app/jobs/WelcameEmailJob" 
import redisConfig from "../config/redis"

// Fila
const jobs = [DummyJob, WelcameEmailJob]

import { Job } from "bee-queue";

interface QueueEntry {
    bee: Bee;
    handle: (job: Job<any>) => any;
}

class Queue {
    private queues: Record<string, QueueEntry>;

    constructor() {
        // Todas as filas de trabalho da aplicação
        this.queues = {} as Record<string, QueueEntry>;

        this.init();
    }

    init() {
        // Inicializa as filas de trabalho
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig
                }),
                handle
            }
        })
    }

    add(queue: string, job: any) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key]

            bee.on("failed", this.handleFailure).process(handle)
        })
    }

    handleFailure(job: Job<any>, err: Error) {
        console.error(`Queue ${job.queue.name}: FAILED`, err);
    }
}

export default new Queue()