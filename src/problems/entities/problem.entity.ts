import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ProblemDocument = Problem & Document;

@Schema()
export class Problem {
    @Prop({required: true})
    day: number;

    @Prop({required: true})
    week: number;

    @Prop({required: true})
    theme: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    difficulty: string;

    @Prop({required: true})
    leetcode: number;

    @Prop({required: true})
    technique: string;

}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
