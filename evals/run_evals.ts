
import fs from 'fs';
import path from 'path';
import { DecisionExtractor } from '../src/extractor';
import { ExtractionResult } from '../src/types';

interface TestCase {
    id: string;
    description: string;
    transcript_snippet: string;
    expected: ExtractionResult;
}

const extractor = new DecisionExtractor();

async function runEvals() {
    const casesPath = path.join(__dirname, 'cases.json');
    const cases: TestCase[] = JSON.parse(fs.readFileSync(casesPath, 'utf-8'));

    console.log(`\n🚀 Running ${cases.length} evaluation cases...\n`);

    let passed = 0;

    for (const testCase of cases) {
        console.log(`Test: ${testCase.id} - ${testCase.description}`);

        try {
            const start = Date.now();
            const result = await extractor.extract(testCase.transcript_snippet);
            const duration = Date.now() - start;

            // Simple "exact match" check for now (will be fuzzy later)
            // We ignore 'confidence' for exact match checks if it varies, but here our mocks match 100%
            const decisionsMatch = JSON.stringify(result.decisions) === JSON.stringify(testCase.expected.decisions);
            const actionsMatch = JSON.stringify(result.action_items) === JSON.stringify(testCase.expected.action_items);

            const isSuccess = decisionsMatch && actionsMatch;

            if (isSuccess) {
                console.log(`  ✅ PASS (${duration}ms)`);
                passed++;
            } else {
                console.log(`  ❌ FAIL (${duration}ms)`);
                console.log(`     Expected:`, JSON.stringify(testCase.expected, null, 2));
                console.log(`     Got:     `, JSON.stringify(result, null, 2));
            }

        } catch (error) {
            console.log(`  🔥 ERROR: ${error}`);
        }
        console.log('---');
    }

    console.log(`\n📊 Summary: ${passed}/${cases.length} passed.`);

    if (passed === cases.length) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

runEvals().catch(console.error);
