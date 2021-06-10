const access = {
  isAdmin: ({ session }: { session: any }) => !!session?.data?.isAdmin,
  isSelfOrAdminListLevel: ({ session, itemId }: any) => {
    if (access.isAdmin({ session })) return true;
    if (!session?.data) {
      return false;
    }
    return { id: session.itemId };
  },
  isSelfOrAdminFieldLevel: ({ session, item }: any) =>
    access.isAdmin({ session }) ||
    (session?.data && session.itemId === item.id.toString()),
};

export default access;
