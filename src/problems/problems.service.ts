import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProblemDocument } from './entities/problem.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel('Problem')
    private readonly problemsModel: Model<ProblemDocument>,
  ) {}

  async create(createProblemDto: CreateProblemDto) {
    const createdProblem = new this.problemsModel(createProblemDto);
    return createdProblem.save();
  }

  async insertMany(problems: CreateProblemDto[]) {
    const problemsWithIds = problems.map((problem) => ({
      _id: new Types.ObjectId(),
      ...problem,
    }));
    return this.problemsModel.insertMany(problemsWithIds);
  }

  async findAll() {
    return this.problemsModel.find().exec();
  }

  async findOne(id: number) {
    return this.problemsModel.findById(id).exec();
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    return this.problemsModel.findByIdAndUpdate(id, updateProblemDto).exec();
  }

  async remove(id: number) {
    return this.problemsModel.findByIdAndDelete(id).exec();
  }
}
