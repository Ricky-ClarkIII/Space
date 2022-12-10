import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" align="center">
          <a style={{ display: 'none' }} href="https://www.flaticon.com/free-icons/black-hole" title="black hole icons">Black hole icons created by Vitaly Gorbachev - Flaticon</a>
          &copy; {new Date().getFullYear()}{' '}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;