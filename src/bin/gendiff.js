#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('2.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, opt) => {
    const { type } = opt;
    console.log(genDiff(firstConfig, secondConfig, type));
  });
program.parse(process.argv);
