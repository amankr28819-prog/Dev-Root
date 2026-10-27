import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Quiz from '../components/Quiz';
import Exercise from '../components/Exercise';
import { ProgressProvider } from '../context/ProgressContext';

describe('MarkdownRenderer Component', () => {
  it('renders bold markdown as strong HTML tag without raw ** symbols', () => {
    const { container } = render(<MarkdownRenderer content="This is **bold text**." />);
    expect(container.querySelector('strong')).toBeInTheDocument();
    expect(container.querySelector('strong')?.textContent).toBe('bold text');
    expect(container.textContent).not.toContain('**');
  });

  it('renders tables wrapped in responsive container without raw pipe characters', () => {
    const tableMarkdown = `
| Column 1 | Column 2 |
| :--- | :--- |
| Val A | Val B |
`;
    const { container } = render(<MarkdownRenderer content={tableMarkdown} />);
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('.table-container')).toBeInTheDocument();
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Val A')).toBeInTheDocument();
  });

  it('renders code blocks and inline code cleanly', () => {
    const codeMarkdown = 'Use `const x = 10;` in your script.';
    const { container } = render(<MarkdownRenderer content={codeMarkdown} />);
    expect(container.querySelector('code')).toBeInTheDocument();
    expect(container.querySelector('code')?.textContent).toBe('const x = 10;');
  });
});

describe('Quiz Component', () => {
  const sampleQuestions = [
    {
      id: 'test-q1',
      question: 'What is HTML?',
      options: ['Markup language', 'Programming language', 'Database'],
      correctIndex: 0,
      explanation: 'HTML provides semantic structure.'
    }
  ];

  it('renders quiz questions, enables selecting answers, and shows feedback upon submit', () => {
    render(
      <ProgressProvider>
        <Quiz lessonId="test-lesson" questions={sampleQuestions} />
      </ProgressProvider>
    );

    expect(screen.getByText('What is HTML?')).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /Submit Answers/i });
    expect(submitBtn).toBeDisabled();

    // Select correct option
    const optionBtn = screen.getByRole('button', { name: /Markup language/i });
    fireEvent.click(optionBtn);

    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    // After submit, shows explanation and score
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(screen.getByText(/HTML provides semantic structure./i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 1 \/ 1/i)).toBeInTheDocument();
  });
});

describe('Exercise Component', () => {
  const sampleExercise = {
    id: 'test-ex1',
    title: 'Test Practice Task',
    instructions: 'Complete the test task.',
    tasks: ['Task 1 requirement'],
    hints: ['First hint to help'],
    solution: {
      explanation: 'Explanation of solution',
      code: 'const result = true;'
    }
  };

  it('toggles hints, solutions, and completion status', () => {
    render(
      <ProgressProvider>
        <Exercise {...sampleExercise} />
      </ProgressProvider>
    );

    expect(screen.getByText('Test Practice Task')).toBeInTheDocument();
    expect(screen.getByText('Task 1 requirement')).toBeInTheDocument();

    // Hints drawer toggle
    const hintBtn = screen.getByRole('button', { name: /Need a Hint/i });
    fireEvent.click(hintBtn);
    expect(screen.getByText(/First hint to help/i)).toBeInTheDocument();

    // Solution drawer toggle
    const solutionBtn = screen.getByRole('button', { name: /Reveal Reference Solution/i });
    fireEvent.click(solutionBtn);
    expect(screen.getByText(/Explanation of solution/i)).toBeInTheDocument();

    // Completion button
    const solveBtn = screen.getByRole('button', { name: /Mark as Solved/i });
    fireEvent.click(solveBtn);
    expect(screen.getByText(/Exercise Solved!/i)).toBeInTheDocument();
  });
});
