import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';

import { expect, test } from 'vitest';

import UserCardList from './user-card-list.svelte';
test('button with event', async () => {
	render(UserCardList, {
		users: [
			{
				createdAt: new Date(),
				firstName: 'test',
				id: '123',
				lastName: 'test',
				avatar: {
					url: 'test'
				},
				email: 'test@test.com',
				firstTime: true,
				verified: true,
				updatedAt: new Date()
			}
		]
	});
	const text = screen.queryByText(/List of Example Users/);
	expect(text).toBeInTheDocument();
});
