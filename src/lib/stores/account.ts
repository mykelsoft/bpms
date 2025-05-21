import { writable } from 'svelte/store';

export const accountStore = writable<Account | null>(null);

export const setAccount = (account: Account) => {
    accountStore.set(account);
}

export const getAccount = () => {
    return accountStore.get();
}