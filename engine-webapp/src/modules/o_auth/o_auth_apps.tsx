/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  ExtensionAuth,
  useExtensionAuthsQuery,
} from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { ExtensionIcon, Header, Loader, Table } from 'components';

import styles from './o_auth_apps.module.scss';

export function OAuthApps() {
  const router = useRouter();

  const {
    query: { workspaceId },
  } = router;
  const { data, loading } = useExtensionAuthsQuery({
    variables: {
      workspaceId: workspaceId as string,
    },
  });

  const columns = [
    {
      name: 'Name',
      key: 'name',
      render: (data: ExtensionAuth) => (
        <div className={styles.tableDataContainer}>
          {data['extensionAuthName']}
        </div>
      ),
    },
    {
      name: 'Integration',
      key: 'integration',
      render: (data: ExtensionAuth) => (
        <div className={styles.tableDataContainer}>
          <div className={styles.extensionName}>
            <ExtensionIcon
              icon={data.extensionDefinition.icon}
              width={25}
              height={25}
            />
            <Text>{data.extensionDefinition.name}</Text>
          </div>
        </div>
      ),
    },
    {
      name: 'Last Updated',
      key: 'last_updated',
      render: (data: ExtensionAuth) => (
        <div className={styles.tableDataContainer}>
          {new Date(data.updatedAt).toLocaleString()}
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header
        title="OAuth Apps"
        actions={
          <Button onClick={() => router.push(`${router.asPath}/new`)}>
            + New OAuth app
          </Button>
        }
      />

      <div className={styles.tableContainer}>
        <Paper radius="md" className={styles.tablePaper}>
          <Table
            horizontalSpacing="lg"
            columns={columns}
            idKey="extensionAuthId"
            onRowClick={(id: string) => router.push(`${router.asPath}/${id}`)}
            data={data.getExtensionAuthsByWorkspace}
          />
        </Paper>
      </div>
    </div>
  );
}

OAuthApps.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
