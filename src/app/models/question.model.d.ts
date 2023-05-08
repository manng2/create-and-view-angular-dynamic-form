interface QuestionModel {
  id: number;
  type: 'checkbox' | 'paragraph';
  question: string;
  answers?: string[];
  isAllowedSpecifyAnswer: boolean;
  isRequired: boolean;
}
