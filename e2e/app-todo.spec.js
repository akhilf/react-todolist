const { test, expect } = require('@playwright/test');

test.describe('Todo Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should load the todo list on load', async ({ page }) => {
    await expect(page.locator('header')).toContainText('Todo List');
    await expect(page.locator('[aria-label="Clear all tasks"]')).toBeVisible();
    await expect(page.locator('[aria-label="Sort tasks by priority"]')).toBeVisible();
  });
  test('should allow adding a new todo item', async ({ page }) => {
    await page.fill('input[placeholder="Add todo item"]', 'New Task');
    await page.click('button:has-text("Add")');
    await expect(page.locator('ul')).toContainText('New Task');
  });
  test('should allow removing a todo item', async ({ page }) => {
    await page.fill('input[placeholder="Add todo item"]', 'Task to Remove');
    await page.click('button:has-text("Add")');
    await page.click(`li:has-text("Task to Remove") >> button:has-text("Remove")`);
    await expect(page.locator('ul')).not.toContainText('Task to Remove');
  });
  test('should clear the entire todo list', async ({ page }) => {
    await page.fill('input[placeholder="Add todo item"]', 'Task 1');
    await page.click('button:has-text("Add")');

    await page.fill('input[placeholder="Add todo item"]', 'Task 2');
    await page.click('button:has-text("Add")');

    await page.click('button:has-text("Clear List")');

    await expect(page.locator('ul')).not.toContainText('Task 1');
    await expect(page.locator('ul')).not.toContainText('Task 2');
  });
  test('should sort tasks by priority', async ({ page }) => {
    await page.fill('input[placeholder="Add todo item"]', 'Task A');
    await page.fill('input[type="number"]', '5');
    await page.click('button:has-text("Add")');

    await page.fill('input[placeholder="Add todo item"]', 'Task B');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Add")');

    await page.click('button:has-text("Sort by Priority")');
    
    const tasks = await page.$$eval('ul li', listItems => listItems.map(item => item.textContent));
    expect(tasks[0]).toContain('Task B');
    expect(tasks[1]).toContain('Task A');
  });

});