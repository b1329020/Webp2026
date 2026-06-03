import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function App() {
  const [allData, setAllData] = useState([]);
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const columns = [
    {
      field: 'title',
      headerName: '名稱',
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'location',
      headerName: '地點',
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'price',
      headerName: '票價',
      flex: 1,
      minWidth: 150,
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const openUrl =
          'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

        const response = await fetch(openUrl);

        if (!response.ok) {
          throw new Error('資料下載失敗，狀態碼：' + response.status);
        }

        const data = await response.json();

        const formattedRows = data.map((item, index) => {
          const firstShowInfo =
            item.showInfo && item.showInfo.length > 0 ? item.showInfo[0] : null;

          return {
            id: index + 1,
            title: item.title || '無名稱資訊',
            location: firstShowInfo ? firstShowInfo.location || '無地點資訊' : '無地點資訊',
            price: firstShowInfo ? firstShowInfo.price || '無票價資訊' : '無票價資訊',
          };
        });

        setAllData(formattedRows);
        setRows(formattedRows);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setKeyword(value);

    const filteredRows = allData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setRows(filteredRows);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8f9fa',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#000000'
            }}
          >
            景點觀光展覽資訊
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <TextField
              label="名稱搜尋"
              placeholder="輸入關鍵字..."
              value={keyword}
              onChange={handleSearchChange}
              sx={{
                width: {
                  xs: '100%',
                  sm: '60%',
                },
              }}
            />
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}

          {loading ? (
            <Box
              sx={{
                height: 400,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 20, 50]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                      page: 0,
                    },
                  },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}